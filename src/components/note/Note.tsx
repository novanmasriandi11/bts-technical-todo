import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { createNote, deleteNote, getAllNotes, getChekclistItemById } from "../../api/note";
import type { ChecklistItem, Note } from "../../types";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2, Trash } from "lucide-react";

export default function Note() {
   const { isAuthenticated } = useAuth();
   const navigate = useNavigate();

   const [notes, setNotes] = useState<Note[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const [isCreatingNote, setIsCreatingNote] = useState<boolean>(false);
   const [newNoteName, setNewNoteName] = useState<string>("");

   const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
   const [selectedNote, setSelectedNote] = useState<ChecklistItem | null>(null);

   useEffect(() => {
      if (!isAuthenticated) {
         navigate("/login", { replace: true });
         return;
      }
      loadNotes();
   }, [isAuthenticated, navigate]);

   const loadNotes = async () => {
      setLoading(true);
      setError(null);
      try {
         const data = await getAllNotes();
         setNotes(data);
      } catch (error: unknown) {
         setError(error instanceof Error ? error.message : "Error loading notes");
      } finally {
         setLoading(false);
      }
   };

   const handleCreateNote = async () => {
      if (!newNoteName.trim()) return;
      try {
         await createNote(newNoteName.trim());
         setNewNoteName("");
         setIsCreatingNote(false);
         loadNotes();
      } catch (error) {
         alert(error instanceof Error ? error.message : "Error creating note");
      }
   };

   const handleDeleteNote = async (noteId: number) => {
      if (!window.confirm("Are you sure you want to delete this note?")) return;
      try {
         await deleteNote(noteId);
         loadNotes();
      } catch (error) {
         alert(error instanceof Error ? error.message : "Error deleting note");
      }
   };

   const handleNoteClick = async (noteId: number, itemId: number) => {
      try {
         const item = await getChekclistItemById(noteId, itemId);
         setSelectedNote(item);
         setIsViewOpen(true);
      } catch (error: unknown) {
         alert(error instanceof Error ? error.message : "Error fetching checklist item");
      }
   };

   return (
      <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
         <div className="flex justify-end mb-6">
            <Dialog open={isCreatingNote} onOpenChange={setIsCreatingNote} >
               <DialogTrigger asChild>
                  <Button variant="default">Create note</Button>
               </DialogTrigger>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Create a new note</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                     <Input
                        placeholder="Enter note name"
                        value={newNoteName}
                        onChange={(e) => setNewNoteName(e.target.value)}
                     />
                  </div>
                  <DialogFooter>
                     <Button
                        onClick={handleCreateNote}
                        disabled={!newNoteName.trim()}
                     >
                        Submit
                     </Button>
                  </DialogFooter>
               </DialogContent>
            </Dialog>
         </div>

         {loading && <Loader2 className="animate-spin h-6 w-6 mx-auto" />}
         {error && <div className="text-red-600 dark:text-red-400 text-center">{error}</div>}

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
               <div
                  key={note.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
               >
                  <button
                     className="text-red-500 hover:text-red-700 absolute top-2 right-2"
                     onClick={() => handleDeleteNote(note.id)}
                  >
                     <Trash className="h-5 w-5" />
                  </button>

                  <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                     {note.name}
                  </h2>

                  <ul className="space-y-1">
                     {note.items &&
                        note.items.map(item => (
                           <li
                              key={item.id}
                              className="flex items-center"
                              onClick={() => handleNoteClick(note.id, item.id)}
                           >
                              <input
                                 type="checkbox"
                                 checked={item.itemCompletionStatus}
                                 readOnly
                                 className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <span
                                 className={`text-gray-900 dark:text-gray-100 ${item.itemCompletionStatus
                                    ? 'line-through text-gray-400 dark:text-gray-500'
                                    : ''
                                    }`}
                              >
                                 {item.name}
                              </span>
                           </li>
                        ))}
                  </ul>
               </div>
            ))}
         </div>

         <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Checklist Item Details</DialogTitle>
               </DialogHeader>
               {selectedNote && (
                  <div className="mt-2 space-y-2">
                     <p><strong>Name:</strong> {selectedNote.name}</p>
                     <p>
                        <strong>Status:</strong>{' '}
                        {selectedNote.itemCompletionStatus ? 'Completed' : 'Pending'}
                     </p>
                  </div>
               )}
            </DialogContent>
            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="ghost">Close</Button>
               </DialogClose>
            </DialogFooter>
         </Dialog>
      </div>
   )
}
