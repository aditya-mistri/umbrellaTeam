/* eslint-disable react-hooks/rules-of-hooks */

import React, { useRef } from "react";
import { useGetTasksQuery, useUpdateTaskStatusMutation } from "../../state/api";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "../../state/api";
import { EllipsisVertical, Plus, MessageSquareMore } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const projectId = Number(id);
  if (isNaN(projectId)) return <div>Invalid Project ID</div>;

  const { data: tasks = [], isLoading, error } = useGetTasksQuery({ projectId });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="overflow-x-auto pb-6">
        <div className="grid min-w-[900px] grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {taskStatus.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks}
              moveTask={moveTask}
              setIsModalNewTaskOpen={setIsModalNewTaskOpen}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

const LoadingState = () => (
  <div className="flex h-full w-full items-center justify-center p-8">
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-dark-secondary">
      <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-dark-tertiary"></div>
    </div>
  </div>
);

const ErrorState = () => (
  <div className="flex h-full w-full items-center justify-center p-8">
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-dark-secondary">
      <p className="text-red-500 dark:text-red-400">An error occurred while fetching tasks</p>
    </div>
  </div>
);

interface TaskColumnProps {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const TaskColumn = ({ status, tasks, moveTask, setIsModalNewTaskOpen }: TaskColumnProps) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={`flex h-full flex-col rounded-lg transition-colors ${isOver ? "bg-blue-100/20 dark:bg-neutral-950/20" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div className="w-1.5 rounded-s-lg bg-blue-600" />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-4 py-3 shadow-sm dark:bg-dark-secondary">
          <h3 className="flex items-center text-base font-semibold dark:text-white">{status}</h3>
          <button onClick={() => setIsModalNewTaskOpen(true)} className="p-2">
            <Plus size={18} />
          </button>
        </div>
      </div>
      <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto px-2 pb-4">
        {tasks.filter((task) => task.status === status).map((task) => (
          <Task key={task.id} task={task} />
        ))}
        {tasks.length === 0 && <EmptyTaskMessage />}
      </div>
    </div>
  );
};

const EmptyTaskMessage = () => (
  <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 px-3 py-4 text-center dark:border-dark-tertiary">
    <p className="text-sm text-gray-500 dark:text-gray-400">Drag tasks here or add a new task</p>
  </div>
);

interface TaskProps {
  task: TaskType;
}

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  return (
    <div
      ref={drag}
      className={`group cursor-grab rounded-lg bg-white p-4 shadow-sm dark:bg-dark-secondary dark:text-white ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {task.attachments?.length > 0 && (
        <div className="mb-3 overflow-hidden rounded-lg">
          <Image
            src={task.attachments[0].fileURL}
            alt={task.attachments[0].fileName || "Task Attachment"}
            width={400}
            height={200}
            className="h-40 w-full object-cover"
          />
        </div>
      )}
      <h4 className="text-base font-medium leading-tight">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-neutral-400">{task.description}</p>
      )}
      <div className="mt-2 flex items-center justify-between">
        {task.assignee?.profilePictureUrl && (
          <Image
            src={task.assignee.profilePictureUrl}
            alt="Assignee"
            width={30}
            height={30}
            className="h-7 w-7 rounded-full"
          />
        )}
        <MessageSquareMore size={16} />
      </div>
    </div>
  );
};

export default BoardView;