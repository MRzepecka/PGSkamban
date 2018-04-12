using Microsoft.AspNetCore.Mvc;
using Pgs.Kanban.Domain.Dtos;
using Pgs.Kanban.Domain.Services;

namespace Pgs.Kanban.Api.Controllers
{
    [Route("api/[controller]")]
    public class ListController : Controller
    {
        private readonly ListService _listService;

        public ListController()
        {
            _listService = new ListService();
        }

        [HttpPost]
        public IActionResult AddList([FromBody] AddListDto addListDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = _listService.AddList(addListDto);

            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpPut]
        public IActionResult EditListName([FromBody] EditListNameDto editListNameDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = _listService.EditListName(editListNameDto);

            if (!result)
            {
                return BadRequest();
            }

            return NoContent();
        }
        
        [HttpDelete("{id}/{boardId}")]
        public IActionResult DeleteList(int id, int boardId)
        {
            var deleteListDto = new DeleteListDto { BoardId = boardId, ListId = id };
            if (deleteListDto.ListId<=0 && deleteListDto.ListId<=0)
            {
                return BadRequest();
            }

            var result = _listService.DeleteList(deleteListDto);

            if (!result)
            {
                return BadRequest();
            }

            return NoContent();
        }
    }
}

