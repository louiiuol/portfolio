import { multiTypeSort } from './multi-type-sort.fn';

describe('multiTypeSort', () => {
	it('should sort an array of objects by a string field in ascending order', () => {
		const data = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
		const result = multiTypeSort(data, 'name', 'asc');
		expect(result).toEqual([
			{ name: 'Alice' },
			{ name: 'Bob' },
			{ name: 'Charlie' },
		]);
	});

	it('should sort an array of objects by a string field in descending order', () => {
		const data = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
		const result = multiTypeSort(data, 'name', 'desc');
		expect(result).toEqual([
			{ name: 'Charlie' },
			{ name: 'Bob' },
			{ name: 'Alice' },
		]);
	});

	it('should sort an array of objects by a number field in ascending order', () => {
		const data = [{ age: 30 }, { age: 20 }, { age: 40 }];
		const result = multiTypeSort(data, 'age', 'asc');
		expect(result).toEqual([{ age: 20 }, { age: 30 }, { age: 40 }]);
	});

	it('should sort an array of objects by a number field in descending order', () => {
		const data = [{ age: 30 }, { age: 20 }, { age: 40 }];
		const result = multiTypeSort(data, 'age', 'desc');
		expect(result).toEqual([{ age: 40 }, { age: 30 }, { age: 20 }]);
	});

	it('should sort an array of objects by a date field in ascending order', () => {
		const data = [
			{ date: new Date('2023-01-01') },
			{ date: new Date('2022-01-01') },
			{ date: new Date('2024-01-01') },
		];
		const result = multiTypeSort(data, 'date', 'asc');
		expect(result).toEqual([
			{ date: new Date('2022-01-01') },
			{ date: new Date('2023-01-01') },
			{ date: new Date('2024-01-01') },
		]);
	});

	it('should sort an array of objects by a date field in descending order', () => {
		const data = [
			{ date: new Date('2023-01-01') },
			{ date: new Date('2022-01-01') },
			{ date: new Date('2024-01-01') },
		];
		const result = multiTypeSort(data, 'date', 'desc');
		expect(result).toEqual([
			{ date: new Date('2024-01-01') },
			{ date: new Date('2023-01-01') },
			{ date: new Date('2022-01-01') },
		]);
	});

	it('should handle an empty array', () => {
		const data: { name: string }[] = [];
		const result = multiTypeSort(data, 'name', 'asc');
		expect(result).toEqual([]);
	});

	it('should handle an array with a single element', () => {
		const data = [{ name: 'Alice' }];
		const result = multiTypeSort(data, 'name', 'asc');
		expect(result).toEqual([{ name: 'Alice' }]);
	});
});
