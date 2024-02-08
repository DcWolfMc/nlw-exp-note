import * as Dialog from "@radix-ui/react-dialog";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}
let speechRecognition: SpeechRecognition | null = null;
export const NewNoteCard: FunctionComponent<NewNoteCardProps> = ({
  onNoteCreated,
}) => {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  function handleStartEditor() {
    setShowOnboarding(false);
  }
  function handleChangeContent(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    event.target.value === "" && setShowOnboarding(true);
  }
  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    if (content == "") {
      toast.error("A sua nota esta vazia!", {
        description:
          "utilize de texto ou do sistema de gravação de notas para adicionar conteúdo a uma nova nota",
      });
    } else {
      onNoteCreated(content);
      setContent("");
      setShowOnboarding(true);
      toast.success("Nota criada com sucesso!");
    }
  }
  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      toast.warning("Reconhecimento de Fala não suportado!", {
        description:
          "Seu navegador não suporta o reconhecimento de fala. Tente com outro.",
      });
      return;
    }
    setIsRecording(true);
    setShowOnboarding(false);

    console.log("window.name", window.name);
    console.log("window.navigator", window.navigator);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    // const AudioRecorder = window.navigator.
    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.maxAlternatives = 1;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce(
        (text, result) => text.concat(result[0].transcript),
        ""
      );
      setContent(transcription);
    };
    speechRecognition.onerror = (event) => {
      console.log("Error", event);
    };
    speechRecognition.start();
  }
  function handleStopRecording() {
    if (speechRecognition) {
      speechRecognition.stop();
      setIsRecording(false);
    }
  }
  function handleCloseModal() {
    console.log("chamado");
    handleStopRecording()
    setShowOnboarding(true);
    setIsRecording(false);
    setContent("");
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col justify-start items-start  max-w-[388px] w-full text-left rounded-md bg-slate-700 outline-none relative overflow-hidden p-5 space-y-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <div className="absolute top-0 right-0 p-1.5 bg-slate-800 aspect-square flex justify-center items-center">
          <ArrowUpRight className="size-6" />
        </div>
        <span className=" text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50 flex-1" />

        <Dialog.Content className="z-10 fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col gap-3 bg-slate-700 md:rounded-md w-full md:h-[60vh] md:max-w-[640px] overflow-hidden outline-none">
          <Dialog.Close
            onClick={handleCloseModal}
            className="absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
          >
            <X className="size-6" />
          </Dialog.Close>
          <form className="flex-1 flex flex-col">
            <div className="flex-1 flex flex-col gap-3 p-6">
              <span className="text-sm font-medium text-slate-300 capitalize">
                Adicionar nota
              </span>
              {showOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    type="button"
                    className="font-medium text-lime-500 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                    onClick={handleStartRecording}
                  >
                    {" "}
                    gravando uma nota{" "}
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-lime-500 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                  >
                    {" "}
                    utilize apenas texto{" "}
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  placeholder="Escreva a sua nota aqui!"
                  autoFocus
                  className="flex-1 text-sm leading-6 text-slate-400 bg-transparent resize-none outline-none"
                  value={content}
                  onChange={handleChangeContent}
                />
              )}
            </div>
            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full flex flex-row gap-2 justify-center items-center py-4 bg-slate-800 text-red-600 hover:text-red-500 text-center font-medium group"
              >
                <div className="size-3 bg-red-600 rounded-full animate-pulse" />
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                className="w-full py-4 bg-lime-400 text-lime-950 text-center font-medium hover:bg-lime-300 hover:text-lime-900 group"
                onClick={handleSaveNote}
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
