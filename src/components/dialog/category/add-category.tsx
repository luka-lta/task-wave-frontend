import React, {useState} from 'react';
import {Loader2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';

interface AddCategoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCategory: (name: string, description: string, color: string) => void;
    isLoading: boolean;
}

export default function AddCategoryDialog({
                                              isOpen,
                                              onClose,
                                              onAddCategory,
                                              isLoading,
                                          }: AddCategoryDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: '000000',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === 'color' ? value.replace('#', '') : value,
        }));
    };

    const handleAddCategory = () => {
        const {name, description, color} = formData;
        if (!name.trim()) {
            alert('Category name is required');
            return;
        }
        onAddCategory(name, description, color);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                        Add a new category to organize your tasks.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Category name"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Category description"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="color" className="text-right">
                            Color
                        </Label>
                        <div className="col-span-3 flex items-center gap-2">
                            <Input
                                id="color"
                                type="color"
                                value={`#${formData.color}`}
                                onChange={handleChange}
                                className="h-10 w-10 p-0 border-none"
                            />
                            <Input
                                value={`#${formData.color}`}
                                onChange={handleChange}
                                placeholder="#000000"
                                className="flex-grow"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddCategory} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Add Category
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
