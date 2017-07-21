import { TestBed, inject } from '@angular/core/testing';

import { SidebarServiceService } from './sidebar-service.service';

describe('SidebarServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarServiceService]
    });
  });

  it('should be created', inject([SidebarServiceService], (service: SidebarServiceService) => {
    expect(service).toBeTruthy();
  }));
});
