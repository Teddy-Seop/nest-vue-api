import { Scalar } from '@nestjs/graphql';

import { GraphQLUpload } from 'graphql-upload';

@Scalar('Upload')
export class Upload {
  description = 'Upload custom scalar type';

  parseValue(value) {
    return GraphQLUpload.parseValue(value);
  }
}
