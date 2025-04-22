


export interface Conversation {
    id: number;
    name: string;
    description: string;
    file_name: string;
    created_at: string;
    updated_at: string;
}
export const conversation =  <Conversation[]>[
    {
        "id": 1,
        "name": "Conversation 1",
        "description": "Conversation 1 description",
        'file_name': 'conversation_1.mp4',
        "created_at": "2021-01-01",
        "updated_at": "2021-01-01"
    }

]
