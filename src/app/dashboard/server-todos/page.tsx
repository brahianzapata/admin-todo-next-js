export const dynamic = 'force-dynamic'; // 'auto' | 'force-dynamic' | 'error' | 'force-static'
export const revalidate = 0; // false | 0 | number

import { NewTodo, TodosGrid } from "@/todos";
import prisma from "@/lib/prisma";
import { getServerSessionServer } from "@/auth/auth/auth-actions";
import { redirect } from "next/navigation";

export const metadata = {
 title: 'List Todos',
 description: 'List Todos',
};

export default async function ServerTodosPage() {

  const user =  await getServerSessionServer();

  if( !user ) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({ 
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  });
  
  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos}/>
    </>
  );
}