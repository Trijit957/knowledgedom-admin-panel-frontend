export interface StudentResponseInterface {
	page: number;
	pageSize: number;
	totalPages: number;
	students: Array<StudentInterface>;
}

export interface StudentInterface {
	_id: string;
	name: string;
	gender: string;
	class: string;
	school: string;
	board: string;
	phone: string;
	guardianName: string;
	guardianPhone: string;
	addedAt: string;
}