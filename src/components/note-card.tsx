import * as Dialog from "@radix-ui/react-dialog";
import { FunctionComponent } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {X} from "lucide-react"
interface NoteCardProps {
  note: {
    date: Date;
    content: string;
  };
}

export const NoteCard: FunctionComponent<NoteCardProps> = ({ note }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col justify-start items-start text-left rounded-md bg-slate-800 outline-none relative overflow-hidden p-5 gap-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {note.date.toISOString()}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className=" absolute bottom-0 left-0 right-0 h-1/2 w-full bg-gradient-to-t from-black/60 to-black/0" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50 flex-1" />

        <Dialog.Content className="z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 bg-slate-700 rounded-md w-full h-[60vh] max-w-[640px] overflow-hidden outline-none">
          <Dialog.Close className="absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100">
            <X className="size-6"/>
          </Dialog.Close>
          <div className="flex-1 flex flex-col gap-3 p-6">
            <span className="text-sm font-medium text-slate-300 capitalize">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>
          <button className="w-full py-4 bg-slate-800 text-slate-300 text-center font-medium group">
            Deseja <span className="text-red-500 group-hover:underline">apagar essa nota</span>?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
