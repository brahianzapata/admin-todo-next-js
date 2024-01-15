// 'use client'

import { NewTodo, TodosGrid } from "@/todos";
import prisma from "@/lib/prisma";
// import { useEffect } from "react";

export const metadata = {
 title: 'List Todos',
 description: 'List Todos',
};

export default async function RestTodosPage() {

  // useEffect(() => {
  //   fetch('/api/todos')
  //     .then( resp => resp.json() )
  //     .then( console.log );

  // }, []);

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' }});
  

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos}/>
    </div>
  );
}