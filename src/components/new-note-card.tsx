export const NewNoteCard = () => {
  return (
    <button className="flex flex-col justify-start items-start text-left rounded-md bg-slate-700 outline-none relative overflow-hidden p-5 space-y-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <div className="absolute top-0 right-0 bg-slate-800 aspect-square flex justify-center items-center">
        icone
      </div>
      <span className=" text-sm font-medium text-slate-200">Adicionar nota</span>
      <p className="text-sm leading-6 text-slate-400">
        Grave uma nota em áudio que será convertida para texto automaticamente.
      </p>
    </button>
  );
};
