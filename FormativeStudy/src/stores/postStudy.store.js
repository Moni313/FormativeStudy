import { defineStore } from 'pinia';
import poststudydata from '../data/poststudy.json';

export const postStudyUseStore = defineStore({
    id: 'posttaskdata',
    state: () => {
        return {
            poststudydata : poststudydata
        }
    }
});