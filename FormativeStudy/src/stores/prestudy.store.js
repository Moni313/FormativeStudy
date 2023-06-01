import { defineStore } from 'pinia';
import prestudydata from '../data/prestudy.json';

export const preStudyUseStore = defineStore({
    id: 'prestudydata',
    state: () => {
        return {
            prestudydata : prestudydata
        }
    }
});