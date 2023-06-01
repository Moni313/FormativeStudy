import { defineStore } from 'pinia';
import sepsisquest from '../data/mainQuestion.json';

export const sepsisQuestStore = defineStore({
    id: 'sepsisquestdata',
    state: () => {
        return {
            sepsisquest : sepsisquest
        }
    }
});