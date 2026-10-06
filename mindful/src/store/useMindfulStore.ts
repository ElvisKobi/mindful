import { create } from "zustand";

type Prompt = {
    promptId: string
    promptIcon: string
    prompt: string
}

type MindfulStore = {
    prompts: Prompt []
    currentIndex: number
    nextPrompt: () => void
}

const useMindfulStore = create<MindfulStore>()((set) => ({
  prompts: [
    { promptId: '1', promptIcon: '🌿', prompt: 'What would you do with this hour if the phone didn\'t exist?' },
    { promptId: '2', promptIcon: '🌊', prompt: 'You are not missing anything. Everything you need is already here.' },
    { promptId: '3', promptIcon: '☁️', prompt: 'What is one small thing you can do right now that your future self will thank you for?' },
    { promptId: '4', promptIcon: '🕯️', prompt: 'Boredom is a doorway. What is it inviting you toward today?' },
    { promptId: '5', promptIcon: '🌱', prompt: 'You opened this app seeking something. What were you really looking for?' },
    { promptId: '6', promptIcon: '🦋', prompt: 'The scroll never ends. But your day does. How will you spend what is left?' },
  ],
  currentIndex: 0,
  nextPrompt: () =>
    set((state) => ({
      currentIndex: (state.currentIndex + 1) % state.prompts.length
    })),
}))

export default useMindfulStore