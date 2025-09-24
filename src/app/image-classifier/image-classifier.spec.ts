import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageClassifier } from './image-classifier';

describe('ImageClassifier', () => {
  let component: ImageClassifier;
  let fixture: ComponentFixture<ImageClassifier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageClassifier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageClassifier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
