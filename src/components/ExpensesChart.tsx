import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Movement } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ExpensesChartProps {
    moves: Movement[];
}



const ExpensesChart: React.FC<ExpensesChartProps> = () => {

    const [moves, setMoves] = useState<Movement[]>([]);

    useEffect(() => {
        const storedMoves = JSON.parse(localStorage.getItem('moves') || '[]');
        setMoves(storedMoves);
    }, [moves]);

    const expenses = moves.filter(move => move.typeMove === 'retiro');

    const expenseByCategory = expenses.reduce((acc: { [key: string]: number }, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + Number(-expense.amount);
        return acc;
    }, {});

    const data = {
        labels: Object.keys(expenseByCategory),
        datasets: [
            {
                label: 'Gastos por Categoría',
                data: Object.values(expenseByCategory),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Gastos por Categoría',
            },
        },
    };

    return <Bar data={data} options={options} className=''/>;
};

export default ExpensesChart;