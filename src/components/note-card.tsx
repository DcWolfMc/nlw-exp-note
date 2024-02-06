export const NoteCard = () => {
  return (
    <button className="flex flex-col justify-start items-start text-left rounded-md bg-slate-800 outline-none relative overflow-hidden p-5 space-y-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-300">Adicionar nota</span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis, quos!
        Impedit rerum officia, repellendus fuga aut, delectus facilis
        repudiandae quia quos harum recusandae, quaerat adipisci quis deserunt.
        Repellendus, quod reprehenderit?
      </p>
      <div className=" absolute bottom-0 left-0 right-0 h-1/2 w-full bg-gradient-to-t from-black/60 to-black/0" />
    </button>
  );
};
