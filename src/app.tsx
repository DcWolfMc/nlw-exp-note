import logo from "./assets/logo-nlw-expert.svg";
export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} />
      <form className="w-full" action="">
        <input
          type="text"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          placeholder="Busque em suas notas..."
        />
      </form>

      <div className="h-[1px] bg-slate-700" />
      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <button className="rounded-md bg-slate-700 outline-none relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-slate-800 aspect-square flex justify-center items-center" >icone</div>
          <span>Adicionar nota</span>
          <p>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
        </button>

        <button className="rounded-md bg-slate-800 outline-none relative overflow-hidden">
          <div className=" absolute bottom-0 left-0 right-0 h-1/2 w-full bg-gradient-to-t from-black/60 to-black/0"/>
        </button>

        <button className="rounded-md bg-slate-800 outline-none relative overflow-hidden">
          <div className=" absolute bottom-0 left-0 right-0 h-1/2 w-full bg-gradient-to-t from-black/60 to-black/0"/>
        </button>

        <button className="rounded-md bg-slate-800 outline-none relative overflow-hidden">
          <div className=" absolute bottom-0 left-0 right-0 h-1/2 w-full bg-gradient-to-t from-black/60 to-black/0"/>
        </button>
      </div>
    </div>
  );
}
