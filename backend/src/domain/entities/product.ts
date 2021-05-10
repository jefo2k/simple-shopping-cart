export class Product {

  private id: string
  private name: string
  private description: string
  private thumbUrl: string
  private createdAt: Date
  private updatedAt: Date

  constructor(id: string, name: string, description: string, thumbUrl: string) {
    this.validateParams(id, name, description)

    this.id = id
    this.name = name
    this.description = description
    this.thumbUrl = thumbUrl

    const today = new Date()
    this.createdAt = today
    this.updatedAt = today

    // Object.freeze(this)
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

  public getCreatedAtISOStr() {
    return this.createdAt.toISOString()
  }

  public getUpdatedAt() {
    return this.updatedAt
  }

  public getUpdatedAtISOStr() {
    return this.updatedAt.toISOString()
  }

  public getThumbUrl() {
    return this.thumbUrl
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

  private validateParams(id: string, name: string, description: string): void {
    if (!id || id.trim().length < 1 ) throw new Error('invalid id, must not be empty')
    if (!name || name.trim().length < 1) throw new Error('invalid name, must not be empty')
    if (name.length > 60) throw new Error('invalid name, has more than 60 chars')
    if (!description || description.trim().length < 1) throw new Error('invalid description, must not be empty')
    if (description.length > 255) throw new Error('invalid description, has more than 255 chars')
  }

}