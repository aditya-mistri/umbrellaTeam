import React from "react";
import { useGetTasksQuery, useUpdateTaskStatusMutation } from "../../state/api";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
import { EllipsisVertical, Plus, MessageSquareMore, X } from "lucide-react";
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

  const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-dark-secondary">
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-dark-tertiary"></div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-dark-secondary">
        <p className="text-red-500 dark:text-red-400">An error occurred while fetching tasks</p>
      </div>
    </div>
  );

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

interface TaskColumnProps {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor: Record<string, string> = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      ref={drop}
      className={`flex h-full flex-col rounded-lg transition-colors ${
        isOver ? "bg-blue-100/20 dark:bg-neutral-950/20" : ""
      }`}
    >
      <div className="mb-3 flex w-full">
        <div
          className="w-1.5 rounded-s-lg"
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-4 py-3 shadow-sm dark:bg-dark-secondary">
          <h3 className="flex items-center text-base font-semibold dark:text-white">
            {status}{" "}
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium dark:bg-dark-tertiary">
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <button
              className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-dark-tertiary dark:hover:text-white"
              aria-label="More options"
            >
              <EllipsisVertical size={18} />
            </button>
            <button
              className="flex items-center rounded-md bg-gray-100 p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-dark-tertiary dark:text-gray-300 dark:hover:bg-dark-tertiary/80 dark:hover:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
              aria-label="Add new task"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto px-2 pb-4">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <Task key={task.id} task={task} />
          ))}
        {tasksCount === 0 && (
          <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 px-3 py-4 text-center dark:border-dark-tertiary">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Drag tasks here or add a new task
            </p>
          </div>
        )}
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

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        priority === "Urgent"
          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          : priority === "High"
            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
            : priority === "Medium"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : priority === "Low"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
      }`}
    >
      {priority}
    </div>
  );

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "MMM d")
    : "";
  const formattedEndDate = task.dueDate
    ? format(new Date(task.dueDate), "MMM d")
    : "";
  const numberOfComments = (task.comments && task.comments.length) || 0;

  return (
    <div
      ref={drag}
      className={`group cursor-grab rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-dark-secondary dark:text-white ${
        isDragging ? "opacity-50 ring-2 ring-blue-400 ring-opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-3 overflow-hidden rounded-lg">
          <Image
            src={`/${task.attachments[0].fileURL}`}
            alt={task.attachments[0].fileName}
            width={400}
            height={200}
            className="h-40 w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="mb-2 flex items-start justify-between">
        <h4 className="text-base font-medium leading-tight dark:text-white">
          {task.title}
        </h4>
        <button className="ml-2 flex-shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-dark-tertiary dark:hover:text-gray-300">
          <EllipsisVertical size={16} />
        </button>
      </div>

      {task.description && (
        <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-neutral-400">
          {task.description}
        </p>
      )}

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {task.priority && <PriorityTag priority={task.priority} />}
        
        {typeof task.points === "number" && (
          <div className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
            {task.points} Points
          </div>
        )}
        
        {taskTagsSplit.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {taskTagsSplit.slice(0, 2).map((tag) => (
              <div
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-dark-tertiary dark:text-gray-300"
              >
                {tag.trim()}
              </div>
            ))}
            {taskTagsSplit.length > 2 && (
              <div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-dark-tertiary dark:text-gray-300">
                +{taskTagsSplit.length - 2}
              </div>
            )}
          </div>
        )}
      </div>

      {(formattedStartDate || formattedEndDate) && (
        <div className="mb-3 flex items-center text-xs text-gray-500 dark:text-neutral-500">
          <svg className="mr-1 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formattedStartDate && formattedEndDate ? (
            <span>{formattedStartDate} - {formattedEndDate}</span>
          ) : (
            <span>{formattedStartDate || formattedEndDate}</span>
          )}
        </div>
      )}

      <div className="mt-2 border-t border-gray-200 pt-2 dark:border-dark-tertiary">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2 overflow-hidden">
            {task.assignee && (
              <div className="relative group/tooltip">
                <Image
                  key={task.assignee.userId}
                  src={`/${task.assignee.profilePictureUrl}`}
                  alt={task.assignee.username}
                  width={30}
                  height={30}
                  className="h-7 w-7 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                />
                <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover/tooltip:block dark:bg-black">
                  {task.assignee.username}
                </div>
              </div>
            )}
            {task.author && (
              <div className="relative group/tooltip">
                <Image
                  key={task.author.userId}
                  src={`/${task.author.profilePictureUrl}`}                
                  alt={task.author.username}
                  width={30}
                  height={30}
                  className="h-7 w-7 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                />
                <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover/tooltip:block dark:bg-black">
                  {task.author.username}
                </div>
              </div>
            )}
          </div>
          
          {numberOfComments > 0 && (
            <div className="flex items-center text-gray-500 dark:text-neutral-500">
              <MessageSquareMore size={16} className="mr-1" />
              <span className="text-xs dark:text-neutral-400">
                {numberOfComments}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardView;