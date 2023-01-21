import { randomColorsArray } from '../../../utils/randomColorsArray';
import { layoutsRecipesDemo } from './layoutsRecipesDemo';
import { layoutsListsDemo } from './layoutsListsDemo';

export const userDemo = {
	uuid: 'a8eefbb0-9e50-4c00-b18f-798f2b951633',
	email: 'demo.account@enjoy.com',
	language: 'EN',
	theme: 'light',
	google_name: null,
	avatar_variant: 'beam',
	avatar_colors: randomColorsArray(),
	layouts_recipes: layoutsRecipesDemo,
	layouts_lists: layoutsListsDemo,
};
