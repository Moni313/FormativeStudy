import { defineStore } from 'pinia';
import posttaskdata from '../data/postTask.json';

export const postTaskUseStore = defineStore({
    id: 'posttaskdata',
    state: () => {
        return {
            posttaskdata : posttaskdata
        }
    }
});