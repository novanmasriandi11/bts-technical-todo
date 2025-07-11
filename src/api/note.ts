import type { ChecklistItem, Note } from "../types";
import type { ApiReponse } from "./auth";
import { api } from "./client";

export async function getAllNotes(): Promise<Note[]>{
   const response = await api.get<ApiReponse<Note[]>>("/checklist", { validateStatus: () => true });
   if (response.status !== 200) {
      throw new Error(response.data.errorMessage ?? `Failed to fetch notes: HTTP ${response.status}`);
   }
   if(response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
   }
   return response.data.data;
}

export async function createNote(name: string): Promise<Note> {
   const response = await api.post<ApiReponse<Note>>("/checklist", { name }, { validateStatus: () => true });
   if (response.status !== 201) {
      throw new Error(response.data.errorMessage ?? `Failed to create note: HTTP ${response.status}`);
   }
   if(response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
   }
   return response.data.data;
}

export async function deleteNote(noteId: number): Promise<void> { 
   const response = await api.delete<ApiReponse<null>>(`/checklist/${noteId}`, { validateStatus: () => true });
   if (response.status !== 200) {
      throw new Error(response.data.errorMessage ?? `Failed to delete note: HTTP ${response.status}`);
   }
   if(response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
   }
}

//findAll
export async function getAllChecklistItems(noteId: number): Promise<ChecklistItem[]> {
   const response = await api.get<ApiReponse<ChecklistItem[]>>(`/checklist/${noteId}/item`, { validateStatus: () => true });
   if (response.status !== 200) {
      throw new Error(response.data.errorMessage ?? `Failed to fetch checklist items: HTTP ${response.status}`);
   }
   if(response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
   }
   return response.data.data;
}

//save
export async function createChecklistItem(noteId: number, itemName: string): Promise<ChecklistItem> { 
   const response = await api.post<ApiReponse<ChecklistItem>>(`/checklist/${noteId}/item`, { itemName }, { validateStatus: () => true });
   if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data.errorMessage ?? `Failed to create checklist item: HTTP ${response.status}`);
   }
   if(response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
   }
   return response.data.data;
}

//getById
export async function getChekclistItemById(noteId: number, itemId: number): Promise<ChecklistItem> {
   const response = await api.get<ApiReponse<ChecklistItem>>(`/checklist/${noteId}/item/${itemId}`, { validateStatus: () => true });
   if (response.status !== 200) {
      throw new Error(response.data.errorMessage ?? `Failed to fetch checklist item: HTTP ${response.status}`);
   }
   if(response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
   }
   return response.data.data;
}

//updateItemStatus
export async function updateChecklistItemStatus(noteId: number, itemId: number): Promise<ChecklistItem> {
   const response = await api.put<ApiReponse<ChecklistItem>>(`/checklist/${noteId}/item/${itemId}`, { validateStatus: () => true });
   if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data.errorMessage ?? `Failed to update checklist item status: HTTP ${response.status}`);
   }
   if(response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
   }
   return response.data.data;
}

//deleteItem
export async function deleteChecklistItem(noteId: number, itemId: number): Promise<void> {
   const response = await api.delete<ApiReponse<null>>(`/checklist/${noteId}/item/${itemId}`, { validateStatus: () => true });
   if (response.status !== 200) {
      throw new Error(response.data.errorMessage ?? `Failed to delete checklist item: HTTP ${response.status}`);
   }
   if(response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
   }
}

//renameItem
export async function renameChecklistItem(noteId: number, itemId: number, itemName: string): Promise<ChecklistItem> {
   const response = await api.put<ApiReponse<ChecklistItem>>(`/checklist/${noteId}/item/${itemId}`, { itemName }, { validateStatus: () => true });
   if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data.errorMessage ?? `Failed to rename checklist item: HTTP ${response.status}`);
   }
   if(response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
   }
   return response.data.data;
}