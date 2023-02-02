import { randomColorsArray } from '../../../utils/randomColorsArray';
import { DemoLayoutsRecipes } from './DemoLayoutsRecipes';
import { DemoLayoutsLists } from './DemoLayoutsLists';

export const testuser = {
	uuid: 'a8eefbb0-9e50-4c00-b18f-798f2b951633',
	email: 'test.account@test.com',
	language: 'en',
	theme: 'light',
	google_name: null,
	avatar_variant: 'beam',
	avatar_colors: randomColorsArray(),
	layouts_recipes: DemoLayoutsRecipes,
	layouts_lists: DemoLayoutsLists
};
