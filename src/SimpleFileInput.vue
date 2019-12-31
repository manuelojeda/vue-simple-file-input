<template>
  <div>
    <div class="FileInput--text-input-wrapper">
      <input type="text" class="form-control" v-model="FileName" readonly>
    </div>
    <div class="FileInput--file-input-wrapper">
      <label class="custom-file-upload">
        <input type="file" ref="file" v-on:change="emitFileChange" :accept="acceptType" />
        Select a file
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isImage: {
      type: Boolean,
      default: false
    },
    isPdf: {
      type: Boolean,
      default: false
    },
    isWord: {
      type: Boolean,
      default: false
    },
    isExcel: {
      type: Boolean,
      default: false
    },
    isVideo: {
      type: Boolean,
      default: false
    },
    isAudio: {
      type: Boolean,
      default: false
    }
  },
  name: 'SimpleFileInput',
  data () {
    return {
      FileName: 'Select a file',
      internalFile: null
    }
  },
  computed: {
    acceptType () {
      if (this.isExcel) {
        return '.xlsx, .xls'
      } else if (this.isWord) {
        return '.doc, .docx'
      } else if (this.isImage) {
        return 'image/*'
      } else if (this.isVideo) {
        return 'video/*'
      } else if (this.isPdf) {
        return 'application/pdf'
      } else if (this.isAudio) {
        return 'audio/*'
      } else {
        return '*'
      }
    }
  },
  methods: {
    emitFileChange () {
      if (this.$refs.file.files.length > 0) {
        const file = this.$refs.file.files[0]
        this.FileName = file.name

        const FileBlob = new Blob([file], {
          name: this.FileName,
          type: file.type
        })

        const fileURL = URL.createObjectURL(FileBlob)

        const response = {
          file: this.$refs.file.files[0],
          fileName: this.$refs.file.files[0].name,
          fileBlob: fileURL,
          fileType: file.type
        }

        this.$emit('input', response)
      } else {
        this.$emit('input', null)
        this.FileName = 'Select a file'
      }
    }
  }
}
</script>

<style scoped>
.FileInput--text-input-wrapper {
  float: left;
  width: 60%;
}

.FileInput--text-input-wrapper > .form-control {
  background-color: white;
  width: 100%;
  display: block;
}

.FileInput--file-input-wrapper {
  float: left;
  width: 40%;
}

.FileInput--file-input-wrapper > input[type="file"] {
  display: none;
}
.FileInput--file-input-wrapper > .custom-file-upload {
  border: 1px solid #ccc;
  background-color: #003e70;
  color: #fff;
  width: 100%;
  line-height: inherit;
  text-align: center;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  transition: all ease .2s;
}

.FileInput--file-input-wrapper > .custom-file-upload::hover {
  background-color: lighten(#003e70, 5%);
  box-shadow: 0 14px 26px -12px rgba(156, 39, 176, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(156, 39, 176, 0.2);
}

@media(min-width: 768px) {
  .FileInput--text-input-wrapper {
    width: 70%;
  }
  .FileInput--file-input-wrapper {
    width: 30%;
  }
}
@media(min-width: 992px) {
  .FileInput--text-input-wrapper {
    width: 80%;
  }
  .FileInput--file-input-wrapper {
    width: 20%;
  }
}

</style>
