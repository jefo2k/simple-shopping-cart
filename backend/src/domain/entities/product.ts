export class Product {

  private id: string
  private name: string
  private description: string
  private createdAt: Date
  private updatedAt: Date

  constructor(id: string, name: string, description: string) {
      this.id = id
      this.name = name
      this.description = description

      const today = new Date()
      this.createdAt = today
      this.updatedAt = today
  }

  // getters
  public getId() {
    return this.id
  }

  public getName() {
    return this.name
  }

  public getDescription() {
    return this.description
  }

  public getCreatedAt() {
    return this.createdAt
  }

  public getCreatedAtISOStr():string {
    return this.createdAt.toISOString()
  }

  public getUpdatedAt() {
    return this.updatedAt
  }

  public getUpdatedAtISOStr():string {
    return this.updatedAt.toISOString()
  }

  // setters
  public setName(name: string) {
    this.name = name
    this.setUpdatedAt()
  }

  
  public setDescription(description: string) {
    this.description = description
    this.setUpdatedAt()
  }
  
  // handler functions
  private setUpdatedAt() {
    this.updatedAt = new Date()
  }

}