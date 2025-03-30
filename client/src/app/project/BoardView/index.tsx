import React from "react";
import { useGetTasksQuery, useUpdateTaskStatusMutation } from "../../state/api";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
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

  // ✅ Hooks should be called unconditionally (before any return)
  const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  if (isNaN(projectId)) return <div>Invalid Project ID</div>;

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
              tasks={tasks || []}
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
      <p className="text-red-500 dark:text-red-400">
        An error occurred while fetching tasks
      </p>
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
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  return (
    <div ref={drop} className={`flex h-full flex-col rounded-lg ${isOver ? "bg-blue-100/20 dark:bg-neutral-950/20" : ""}`}>
      <div className="mb-3 flex w-full">
        <div className="w-1.5 bg-gray-500" />
        <div className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-dark-secondary">
          <h3 className="text-base font-semibold dark:text-white">
            {status} <span className="ml-2 text-xs font-medium">{tasksCount}</span>
          </h3>
          <button onClick={() => setIsModalNewTaskOpen(true)} className="p-1.5">
            <Plus size={18} />
          </button>
        </div>
      </div>
      <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto px-2 pb-4">
        {tasks.filter((task) => task.status === status).map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

interface TaskProps {
  task: TaskType;
}

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`group cursor-grab rounded-lg bg-white p-4 shadow-sm ${isDragging ? "opacity-50" : "opacity-100"}`}>
      <h4 className="text-base font-medium">{task.title}</h4>
      {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
      <div className="mt-2 border-t pt-2">
        {task.assignee && <span className="text-xs text-gray-500">{task.assignee.username}</span>}
      </div>
    </div>
  );
};

export default BoardView;
