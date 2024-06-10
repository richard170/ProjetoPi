import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEnderecoComponent } from './cadastro-endereco.component';

describe('CadastroEnderecoComponent', () => {
  let component: CadastroEnderecoComponent;
  let fixture: ComponentFixture<CadastroEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroEnderecoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
