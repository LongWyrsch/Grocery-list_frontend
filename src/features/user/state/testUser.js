import { randomColorsArray } from '../../../utils/randomColorsArray';
import { DemoLayoutsRecipes } from './DemoLayoutsRecipes';
import { DemoLayoutsLists } from './DemoLayoutsLists';

export const testuser = {
	uuid: '5a73309b-6029-4f5e-85e0-69c97cab46f9',
	email: 'test.account@test.com',
	language: 'en',
	theme: 'light',
	google_name: null,
	avatar_variant: 'beam',
	avatar_colors: randomColorsArray(),
	layouts_recipes: DemoLayoutsRecipes,
	layouts_lists: DemoLayoutsLists
};
