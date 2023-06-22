import { defineStore } from 'pinia';
import severequest from '../data/severity.json';

export const severeQuestStore = defineStore({
    id: 'severityquestdata',
    state: () => {
        return {
            severequest : severequest
        }
    }
});