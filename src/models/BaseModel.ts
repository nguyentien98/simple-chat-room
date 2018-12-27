import * as mongoose from 'mongoose';
import { rejects } from 'assert';
import { resolve } from 'dns';

export const schema = mongoose.Schema;

export abstract class BaseModel {

  protected abstract modelName: String;
  protected abstract TableSchema: mongoose.Schema;
  protected ObjectId = schema.ObjectId;

  public model() {
    return mongoose.model(this.modelName, this.TableSchema);
  }

  public all<T>(): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.model().find({}, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    });
  }

  public find<T>(id: mongoose.Schema.Types.ObjectId): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.model().findById(id, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    });
  }

  public filter<T>(filter: mongoose.Schema): Promise<T> {
    return this.model().find(filter);
  }

  public delete<T>(id: mongoose.Schema.Types.ObjectId): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.model().deleteOne({_id: id}, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    });
  }

  public create<T>(data: mongoose.Schema | Array<mongoose.Schema>) {
    if (data instanceof Array) {
      return this.model().insertMany(data);
    } else {
        const model = this.model();
        return new Promise<T>(async (resolve, reject) => {
          new model(data).save((error, data) => {
            if (error) {
              reject(error);
            }
            resolve(data);
          });
        });
    }
  }

  public update<T>(filter: Object, updatedata: mongoose.Schema) {
    return new Promise<T>((resolve, reject) => {
      this.model().update(
        filter,
        updatedata,
        (error, data) => {
          if (error) {
            rejects(error);
          }
          resolve(data);
        }
      );
    });
  }
}
