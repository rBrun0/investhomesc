
'use client'

import { db } from "@/app/firebaseConfig"
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
import { collection, getDocs, query } from "firebase/firestore"
import { useEffect, useState } from "react";
  
  export function UserTable() {

    type Users = {
        uid: string,
        displayName: string,
        email: string,
        role: string 
    }
      
      const [usersList, setUsersList] = useState<Users[]>();
    
      async function fetchUsers() {
        const q = query(collection(db, 'users'))
        
        const querySnapshot = await getDocs(q)
        const temp = [] 
    
        querySnapshot.forEach((doc) => {
          temp.push({
            uid: doc.id,
            displayName: doc.data().displayName,
            email: doc.data().email,
            role: doc.data().role
          })
        })
        setUsersList(temp)
        return usersList
      }

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
  