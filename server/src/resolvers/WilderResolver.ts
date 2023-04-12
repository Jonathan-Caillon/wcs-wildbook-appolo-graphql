import { Arg, Mutation, Query } from "type-graphql";
import dataSource from "../utils";
import { Wilder, Skill } from "../entity";

export class WilderResolver {
  @Query(() => [Wilder])
  async getAllWilders(): Promise<Wilder[]> {
    const wilders = await dataSource.getRepository(Wilder).find();
    return wilders;
  }

  @Mutation(() => Wilder)
  async addWilder(
    @Arg("name") name: string,
    @Arg("city") city: string
  ): Promise<Wilder> {
    const wilderToCreate = new Wilder();
    wilderToCreate.name = name;
    wilderToCreate.city = city;
    return await dataSource.getRepository(Wilder).save(wilderToCreate);
  }

  @Mutation(() => Wilder)
  async updateWilder(
    @Arg("id") id: number,
    @Arg("name", { nullable: true }) name: string,
    @Arg("city", { nullable: true }) city: string
  ): Promise<Wilder> {
    const wilderToUpdate = await dataSource.getRepository(Wilder).findOneBy({
      id,
    });

    if (wilderToUpdate === null) {
      throw new Error(`The skill with id: ${id} does not exist!`);
    }

    wilderToUpdate.name = name;
    wilderToUpdate.city = city;

    return await dataSource.getRepository(Wilder).save(wilderToUpdate);
  }

  @Mutation(() => Boolean)
  async deleteWilder(@Arg("id") id: number): Promise<Boolean> {
    const wilderToDelete = await dataSource.getRepository(Wilder).findOneBy({
      id,
    });

    if (wilderToDelete === null) {
      throw new Error(`The wilder with id: ${id} does not exist!`);
    }

    await dataSource.getRepository(Wilder).delete(id);
    return true;
  }

  @Mutation(() => Wilder)
  async addWilderSkill(
    @Arg("idWilder") idWilder: number,
    @Arg("idSkill") idSkill: number
  ): Promise<Wilder> {
    const wilderToAddSkill = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: idWilder });

    if (wilderToAddSkill === null) {
      throw new Error(`The wilder with id: ${idWilder} does not exist!`);
    }

    const skillToAdd = await dataSource
      .getRepository(Skill)
      .findOneBy({ id: idSkill });

    if (skillToAdd === null) {
      throw new Error("Skill not found");
    }

    wilderToAddSkill.skills = [...wilderToAddSkill.skills, skillToAdd];
    return await dataSource.getRepository(Wilder).save(wilderToAddSkill);
  }

  @Mutation(() => Wilder)
  async removeWilderSkill(
    @Arg("idWilder") idWilder: number,
    @Arg("idSkill") idSkill: number
  ): Promise<Wilder> {
    const wilderToRemoveSkill = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: idWilder });

    if (wilderToRemoveSkill === null) {
      throw new Error(`The wilder with id: ${idWilder} does not exist!`);
    }

    const skillToRemove = await dataSource
      .getRepository(Skill)
      .findOneBy({ id: idSkill });

    if (skillToRemove === null) {
      throw new Error("Skill not found");
    }

    let skills = wilderToRemoveSkill.skills;
    skills = skills.filter((item) => item.id !== skillToRemove.id);
    wilderToRemoveSkill.skills = skills;

    return await dataSource.getRepository(Wilder).save(wilderToRemoveSkill);
  }
}
