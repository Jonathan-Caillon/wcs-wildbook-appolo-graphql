import { Arg, Mutation, Query } from "type-graphql";
import dataSource from "../utils";
import { Skill } from "../entity";

export class SkillResolver {
  @Query(() => [Skill])
  async getAllSkills(): Promise<Skill[]> {
    const skills = await dataSource.getRepository(Skill).find();
    return skills;
  }

  @Mutation(() => Skill)
  async addSkill(@Arg("name") name: string): Promise<Skill> {
    const skillToCreate = new Skill();
    skillToCreate.name = name;

    return await dataSource.getRepository(Skill).save(skillToCreate);
  }

  @Mutation(() => Skill)
  async updateSkill(
    @Arg("id") id: number,
    @Arg("name") name: string
  ): Promise<Skill> {
    const skillToUpdate = await dataSource.getRepository(Skill).findOneBy({
      id,
    });

    if (skillToUpdate === null) {
      throw new Error(`The skill with id: ${id} does not exist!`);
    }

    skillToUpdate.name = name;

    return await dataSource.getRepository(Skill).save(skillToUpdate);
  }

  @Mutation(() => Boolean)
  async deleteWilder(@Arg("id") id: number): Promise<Boolean> {
    const skillToDelete = await dataSource.getRepository(Skill).findOneBy({
      id,
    });

    if (skillToDelete === null) {
      throw new Error(`The skill with id: ${id} does not exist!`);
    }

    await dataSource.getRepository(Skill).delete(id);
    return true;
  }
}
