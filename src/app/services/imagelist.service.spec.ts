import { TestBed } from '@angular/core/testing';


import { ImagelistService } from '../imagelist.service';

describe('ImagelistService', () => {
  let service: ImagelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
