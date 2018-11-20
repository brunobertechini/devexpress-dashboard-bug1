import { PivotGridsModule } from './pivot-grids.module';

describe('PivotGridsModule', () => {
  let pivotGridsModule: PivotGridsModule;

  beforeEach(() => {
    pivotGridsModule = new PivotGridsModule();
  });

  it('should create an instance', () => {
    expect(pivotGridsModule).toBeTruthy();
  });
});
