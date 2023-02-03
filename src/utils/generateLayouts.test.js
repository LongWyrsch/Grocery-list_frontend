import { generateLayouts } from './generateLayouts';
import { DemoRecipes } from '../features/recipes/state/DemoRecipes';

it('generates layouts for a set of recipes', () => {
	// arrange
	const numOfRecipes = 10;
	const width = 2;

	// act
	const generatedLayouts = generateLayouts(DemoRecipes);

	// assert that there are all breakpoints are present
	expect(generatedLayouts.hasOwnProperty('lg')).toBeTruthy();
	expect(generatedLayouts.hasOwnProperty('md')).toBeTruthy();
	expect(generatedLayouts.hasOwnProperty('sm')).toBeTruthy();
	expect(generatedLayouts.hasOwnProperty('xs')).toBeTruthy();
	expect(generatedLayouts.hasOwnProperty('xxs')).toBeTruthy();

	// assert that each breakpoint has 10 layouts, 1 for each recipe.
	expect(generatedLayouts.lg.length).toBe(numOfRecipes);

	// assert that each card has width of 2
	generatedLayouts.lg.forEach((recipe) => expect(recipe.w).toBe(width));
});
