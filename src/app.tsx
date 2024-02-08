import { useState } from "react";
import logo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
import { Note } from "./@types/note";

export function App() {
  const [search, setSearch] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("@nlw-storage: notes");
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });
  function onNoteCreated(content: string) {
    const newNote: Note = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content,
    };
    const notesArry = [newNote, ...notes];
    setNotes(notesArry);
    localStorage.setItem("@nlw-storage: notes", JSON.stringify(notesArry));
  }
  const filteredNotes =
    search !== ""
      ? notes.filter((note) => note.content.toLowerCase().includes(search.toLowerCase()))
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} />
      <form className="w-full" action="">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          placeholder="Busque em suas notas..."
        />
      </form>

      <div className="h-[1px] bg-slate-700" />
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
          />
        ))}
      </div>
    </div>
  );
}
