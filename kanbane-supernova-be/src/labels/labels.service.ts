/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';

export interface LabelOption {
    id: string;
    label: string;
    value: string;
    color: string;
    icon: string;
}

@Injectable()
export class LabelsService {
    labels: LabelOption[] = [
        { id: '1', label: 'JavaScript', value: 'javascript', color: '#f7df1e', icon: 'pi pi-code' },
        { id: '2', label: 'TypeScript', value: 'typescript', color: '#3178c6', icon: 'pi pi-code' },
        { id: '3', label: 'Angular', value: 'angular', color: '#dd0031', icon: 'pi pi-cog' },
        { id: '4', label: 'Backend', value: 'backend', color: '#68217a', icon: 'pi pi-server' },
        { id: '5', label: 'Frontend', value: 'frontend', color: '#61dafb', icon: 'pi pi-desktop' },
        { id: '6', label: 'Database', value: 'database', color: '#336791', icon: 'pi pi-database' },
        { id: '7', label: 'Design', value: 'design', color: '#ff7c43', icon: 'pi pi-palette' },
        { id: '8', label: 'Testing', value: 'testing', color: '#25c2a0', icon: 'pi pi-check-circle' },
        { id: '9', label: 'Urgent', value: 'urgent', color: '#e74c3c', icon: 'pi pi-exclamation-triangle' },
        { id: '10', label: 'Easy', value: 'easy', color: '#2ecc71', icon: 'pi pi-thumbs-up' },
        { id: '11', label: 'Hard', value: 'hard', color: '#e67e22', icon: 'pi pi-star' }
    ];

    create(createLabelDto: CreateLabelDto) {
        const newLabel: LabelOption = {
            id: `${Math.floor(Math.random() * 10000)}`,
            label: createLabelDto.label,
            value: createLabelDto.value,
            color: createLabelDto.color,
            icon: createLabelDto.icon || 'pi pi-tag'
        };
        this.labels.push(newLabel);
        return this.labels;
    }

    findAll() {
        return this.labels;
    }

    findOne(id: string) {
        return this.labels.find((label) => label.id === id);
    }

    update(id: string, updateLabelDto: UpdateLabelDto) {
        const idx = this.labels.findIndex((label) => label.id === id);
        if (idx > -1) {
            this.labels[idx] = { ...this.labels[idx], ...updateLabelDto };
            return { success: true, label: this.labels[idx] };
        }
        return { success: false, message: `Label with id ${id} not found` };
    }

    remove(id: string) {
        const idx = this.labels.findIndex((label) => label.id === id);

        if (idx !== -1) {
            const removed = this.labels.splice(idx, 1)[0];
            return { success: true, label: removed };
        }

        return { success: false, label: null };
    }
}
