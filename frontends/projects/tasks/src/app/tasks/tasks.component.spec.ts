import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';
import { take } from 'rxjs/operators';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

import { GlobalConfigModule } from 'global-config.module';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  const clientParams = { id: 'asd' };
  const queryParams = { useHttp: 'true' };


  beforeEach(async (done) => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatDividerModule,
        MatInputModule,
        MatTooltipModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
        GlobalConfigModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of(clientParams), queryParams: of(queryParams) },
        },
      ],
    }).compileComponents();
    done();
  });

  beforeEach((done) => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    done();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should be a valid client data', async (done) => {
    const [useHttp] = await Promise.all([
      component.useHttp.pipe(take(1)).toPromise(),
    ]);

    expect(useHttp).toBe(true);
    done();
  });
});
