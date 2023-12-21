import { useState } from 'react';
import { Button, Center, Text, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';

export const Home = () => {
    const [tasks, setTasks] = useState([]);

    const exportTasks = () => {
        const tasksJSON = JSON.stringify(tasks);
        const blob = new Blob([tasksJSON], { type: 'application/json' });
        saveAs(blob, 'tasks.json');
    };

    const importTasks = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const importedTasks = JSON.parse(e.target.result);
                setTasks(importedTasks);
            };
            reader.readAsText(file);
        }
    };

    return (
        <Center h="100vh">
            <Stack>
                <Text textAlign="center">Страница Home</Text>
                <Button onClick={exportTasks} colorScheme="green">
                    Экспорт задач
                </Button>
                <input type="file" accept=".json" onChange={importTasks} />
                <Text>Выберите файл для импорта задач</Text>
            </Stack>
        </Center>
    );
};