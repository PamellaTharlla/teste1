
import { Repository } from 'typeorm';
import AppDataSource from '../config/database';
import { Alimento } from '../models/Alimentos';

class AlimentoService {
  private alimentoRepository: Repository<Alimento>;

  constructor() {
    this.alimentoRepository = AppDataSource.getRepository(Alimento);
  }

  async create(alimento: Alimento): Promise<Alimento> {
    const newAlimento = this.alimentoRepository.create(alimento);
    return await this.alimentoRepository.save(newAlimento);
  }

  async getAll(): Promise<Alimento[]> {
    return await this.alimentoRepository.find();
  }

  async getById(id: number): Promise<Alimento | null> {
    return await this.alimentoRepository.findOneBy({ id });
  }

  async getByName(nome: string): Promise<Alimento[]> {
    return await this.alimentoRepository.find({
      where: {
        nome: nome.toLowerCase(), 
      },
    });
  }

  async getByIdAndName(id: number, nome: string): Promise<Alimento[]> {
    return await this.alimentoRepository.find({
      where: {
        id,
        nome: nome.toLowerCase(), 
      },
    });
  }

  async update(id: number, alimento: Partial<Alimento>): Promise<Alimento | null> {
    const existingAlimento = await this.alimentoRepository.findOneBy({ id });
    if (!existingAlimento) return null;

    const updatedAlimento = this.alimentoRepository.merge(existingAlimento, alimento);
    return await this.alimentoRepository.save(updatedAlimento);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.alimentoRepository.delete(id);
    return result.affected !== 0;
  }
}

export default new AlimentoService();