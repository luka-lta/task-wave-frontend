import React from 'react';
import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Trash2} from "lucide-react";

function CategoryItem({ category, setEditingCategory, setIsEditDialogOpen, setDeletingCategoryId, setIsDeleteDialogOpen }) {
    return (
        <TableRow key={category.categoryId}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>
                <Badge style={{backgroundColor: `#${category.color}`}}>
                    #{category.color}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        setEditingCategory(category);
                        setIsEditDialogOpen(true);
                    }}
                >
                    <Pencil className="h-4 w-4"/>
                    <span className="sr-only">Edit {category.name}</span>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        setDeletingCategoryId(category.categoryId);
                        setIsDeleteDialogOpen(true);
                    }}
                >
                    <Trash2 className="h-4 w-4"/>
                    <span className="sr-only">Delete {category.name}</span>
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default CategoryItem;
