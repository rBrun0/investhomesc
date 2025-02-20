
'use client'

import { Users } from "@/app/utils/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEffect } from "react";

type UserTableProps = {
  fetchUsers: () => Promise<Users[]>
  usersList: Users[]
}
  
  export function UserTable({fetchUsers, usersList}: UserTableProps) {
      

      useEffect(() => {
        fetchUsers()
      }, [])

    return (
      <Table>
        <TableCaption>Usuários</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">UID</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right">Cargo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList?.map((invoice) => (
            <TableRow key={invoice.uid}>
              <TableCell className="font-medium">{invoice.uid}</TableCell>
              <TableCell>{invoice.email}</TableCell>
              <TableCell>{invoice.displayName}</TableCell>
              <TableCell>{invoice.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">4</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  