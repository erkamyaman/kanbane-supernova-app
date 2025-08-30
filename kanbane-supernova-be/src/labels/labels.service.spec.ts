import { Test, TestingModule } from '@nestjs/testing';
import { LabelsService } from './labels.service';

describe('LabelsService', () => {
    let service: LabelsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LabelsService],
        }).compile();

        service = module.get<LabelsService>(LabelsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all labels', () => {
        const labels = service.findAll();
        expect(labels).toHaveLength(11);
        expect(labels[0]).toHaveProperty('label', 'JavaScript');
    });

    it('should create a new label', () => {
        const newLabel = {
            label: 'New Label',
            value: 'new-label',
            color: '#000000',
            icon: 'pi pi-star'
        };
        const result = service.create(newLabel);
        expect(result).toHaveLength(12);
        expect(result[result.length - 1]).toMatchObject(newLabel);
    });

    it('should find a label by id', () => {
        const label = service.findOne('1');
        expect(label).toBeDefined();
        expect(label?.label).toBe('JavaScript');
    });

    it('should update a label', () => {
        const updateData = { label: 'Updated JavaScript' };
        const result = service.update('1', updateData);
        expect(result.success).toBe(true);
        expect(result.label.label).toBe('Updated JavaScript');
    });

    it('should remove a label', () => {
        const initialLength = service.findAll().length;
        const result = service.remove('1');
        expect(result.success).toBe(true);
        expect(service.findAll()).toHaveLength(initialLength - 1);
    });
});
