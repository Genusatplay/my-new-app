using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace my_new_app
{
    public class AuthOptions
    {
        public const string ISSUER = "my_new_app";
        public const string AUDIENCE = "http://localhost:51884/";
        const string KEY = "78f0a99977cbfba2d15f3e3096a6cf22594052dfa2aa214704f8d7ad368d9bf2";   // key for enc
        public const int LIFETIME = 1; // min
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }
    }
}
