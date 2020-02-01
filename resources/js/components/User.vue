<template>
 <!-- /.row -->

        <div class="row mt-3">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h1 class="card-title">Users Table</h1>

                <div class="card-tools">
                  <button type="submit" class="btn btn-primary" @click="newModel" >Add User 
                      <i class="nav-icon fas fa-user-plus fa-fw white "></i>
                      </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registered At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.name|uptext}}</td>
                      <td>{{user.email}}</td>
                      <td><span class="badge bg-green">{{user.type |uptext}}</span></td>
                      <td><span class="badge bg-blue">{{user.created_at |datefor}}</span></td>
                      <td>
                          <a href="#" @click="editModel(user)">
                              <i class="nav-icon fas fa-edit green"></i>
                              
                          </a> ||
                          <a href="#" @click="DeleteUser(user.id)">
                              <i class="nav-icon fas fa-trash red"></i>
                          </a>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="newModel" tabindex="-1" role="dialog" aria-labelledby="newModelTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" v-show="!editmode" id="newModelTitle">Create New User</h5>
        <h5 class="modal-title" v-show="editmode" id="newModelTitle">Update User Information</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
                  <form @submit.prevent="editmode ? UpdateUser() : CreateUser()">
                   <div class="modal-body">
                        <div class="form-group">
                    <label>User Name</label>
                    <input v-model="form.name" type="text" name="name" placeholder="Enter Your Name Here."
                        class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                    <has-error :form="form" field="name"></has-error>
                    </div>
                    <div class="form-group">
                    <label>Email</label>
                    <input v-model="form.email" type="text" name="email" placeholder="Enter Your Email Here."
                        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                    <has-error :form="form" field="email"></has-error>
                    </div>
                    <div class="form-group">
                    <label>Password</label>
                    <input v-model="form.password" type="password" name="password" placeholder="Enter Your Password Here."
                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                    <has-error :form="form" field="password"></has-error>
                    </div>
                     <div class="form-group">
                    <label>Bio</label>
                    <textarea v-model="form.bio" type="text" name="bio" placeholder="Enter Your Bio Here."
                        class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                    <has-error :form="form" field="bio"></has-error>
                    </div>
                     <div class="form-group">
                    <label>Type</label>
                    <select v-model="form.type" id="type" name="type"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="author">Author</option>
                        </select>
                    <has-error :form="form" field="type"></has-error>
                    </div>
            
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel  <i class="nav-icon far fa-window-close fa-fw white "></i></button>
        <button type="submit" v-show="!editmode" class="btn btn-primary">Create  <i class="nav-icon fas fa-user-plus fa-fw white "></i></button>
        <button type="submit" v-show="editmode" class="btn btn-success">Update  <i class="nav-icon fas fa-user-plus fa-fw white "></i></button>
      </div>
</form>
    </div>
  </div>
</div>
        </div>
</template>

<script>
    export default {
      
          data () {
    return {
      editmode:false,
      users:{},
      form: new Form({
        id: '',
        name: '',
        email: '',
        password: '',
        type: '',
        bio: '',
        photo: '',
      })
    }
  },
  methods:{
        UpdateUser(user){
          this.$Progress.start();
          this.form.put('api/user/'+this.form.id).then(()=>{
             $('#newModel').modal('hide');
             Fire.$emit('AutoPageRefresh');
            toast.fire({
          icon: 'success',
          title: 'User information Updated successfully',
        });
        this.$Progress.finish();
          }).catch(()=>{
            this.$Progress.fail();
          })
        },
          editModel(user){
            this.editmode = true;
            this.form.reset();
$('#newModel').modal('show');
this.form.fill(user);
          }  ,
          newModel(){
            this.editmode = false;
            this.form.reset();
$('#newModel').modal('show');
          }  ,
    DeleteUser(id){
              Swal.fire({
          title: 'Are you sure,you want delete this?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
              if (result.value) {
          this.form.delete('api/user/'+id).then(()=>{
            
            toast.fire({
          icon: 'success',
          title: 'User Deleted successfully',
        })
            Fire.$emit('AutoPageRefresh');
          
          }).catch(()=>{
              Swal('Failed !','Something went wrong!','warning');
          })
              }
        })
    }
    ,
    loaduser(){
      axios.get('api/user').then(({data})=>(this.users=data.data));
    }
    ,
CreateUser(){
        this.$Progress.start()
      this.form.post('api/user').then(()=>{
            Fire.$emit('AutoPageRefresh');
       $('#newModel').modal('hide');
              toast.fire({
          icon: 'success',
          title: 'User Created successfully',
        });

      }).catch(()=>{

      });
  
     
      this.$Progress.finish();
}
  },
        created() {
            this.loaduser();
            Fire.$on('AutoPageRefresh',() =>{
              this.loaduser();
            }

            );
        }
    }
</script>
