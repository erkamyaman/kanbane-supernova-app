import { Test, TestingModule } from '@nestjs/testing';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';

describe('LabelsController', () => {
    let controller: LabelsController;
    let service: LabelsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LabelsController],
            providers: [LabelsService],
        }).compile();

        controller = module.get<LabelsController>(LabelsController);
        service = module.get<LabelsService>(LabelsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return all labels', () => {
        const result = controller.findAll();
        expect(result).toHaveLength(11);
    });

    it('should create a label', () => {
        const createLabelDto = {
            label: 'Test Label',
            value: 'test-label',
            color: '#ffffff',
            icon: 'pi pi-test'
        };
        const result = controller.create(createLabelDto);
        expect(result).toHaveLength(12);
    });

    it('should find one label', () => {
        const result = controller.findOne('1');
        expect(result).toBeDefined();
        expect(result?.label).toBe('JavaScript');
    });

    it('should update a label', () => {
        const updateLabelDto = { label: 'Updated Label' };
        const result = controller.update('1', updateLabelDto);
        expect(result.success).toBe(true);
    });

    it('should remove a label', () => {
        const result = controller.remove('1');
        expect(result.success).toBe(true);
    });
});
