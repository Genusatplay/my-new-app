using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_new_app.Models;
using Newtonsoft.Json;

namespace my_new_app.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "admin")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public EmployeeController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployers([FromQuery]PageParametersModel pageParams)
        {
            int count = _context.Employees.Count();

            int currentPage = pageParams.PageNumber;
            int pageSize = pageParams.PageSize;
            int totalCount = count;
            int totalPages = (int)Math.Ceiling(count / (double)pageSize);
            //var items = _context.Employees.Skip((currentPage - 1) * pageSize).Take(pageSize).ToListAsync();

            var previousPage = currentPage > 1;
            var nextPage = currentPage < totalPages;
            var sortOrder = pageParams.SortOrder;
            var sortColumnName = pageParams.SortColumnName;

            var sorted = _context.Employees.AsQueryable();
            switch (sortColumnName.ToLower() + "_" + sortOrder.ToLower())
            {
                case "name_desc":
                    sorted = sorted.OrderByDescending(e => e.Name);
                    break;
                case "email_asc":
                    sorted = sorted.OrderBy(e => e.Email);
                    break;
                case "email_desc":
                    sorted = sorted.OrderByDescending(e => e.Email);
                    break;
                case "birthday_asc":
                    sorted = sorted.OrderBy(e => e.Birthday);
                    break;
                case "birthday_desc":
                    sorted = sorted.OrderByDescending(e => e.Birthday);
                    break;
                case "salary_asc":
                    sorted = sorted.OrderBy(e => e.Salary);
                    break;
                case "salary_desc":
                    sorted = sorted.OrderByDescending(e => e.Salary);
                    break;
                default:
                    sorted = sorted.OrderBy(e => e.Name);
                    sortColumnName = "name";
                    sortOrder = "asc";
                    break;
            }

            var paginationMetadata = new
            {
                totalCount,
                pageSize,
                currentPage,
                totalPages,
                previousPage,
                nextPage,
                sortOrder,
                sortColumnName
            };

            HttpContext.Response.Headers.Add("PageParam-Header", JsonConvert.SerializeObject(paginationMetadata));
            return await sorted.Skip((currentPage - 1) * pageSize).Take(pageSize).ToListAsync();
            //return await _context.Employees.ToListAsync();
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(long id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(long id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employee
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(long id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        private bool EmployeeExists(long id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
