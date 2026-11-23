import useMindfulStore from "../store/useMindfulStore"


const PromptCard = () => {

    const prompts = useMindfulStore((state) => state.prompts)
    const currentIndex = useMindfulStore((state) => state.currentIndex)
    const nextPrompt = useMindfulStore((state) => state.nextPrompt)
    const currentPrompt = prompts[currentIndex]

  return (
  <div className="bg-green-950 border border-green-800 rounded-2xl p-6 mb-5">
    <p className="text-3xl mb-3">{currentPrompt.promptIcon}</p>
    <p className="font-serif italic text-lg text-green-100 leading-relaxed mb-4">
      "{currentPrompt.prompt}"
    </p>
    <div className="flex gap-3">
      <button
        onClick={nextPrompt}
        className="border border-green-700 text-green-400 text-xs tracking-widest uppercase px-4 py-2 rounded-lg hover:border-green-400 transition-all"
      >
        New Prompt
      </button>
      <button
        className="bg-green-400 text-green-950 text-xs tracking-widest uppercase px-4 py-2 rounded-lg font-medium"
      >
        Take a Pause ↗
      </button>
    </div>
  </div>
)
}

export default PromptCard