package cz.truchjan.unicorn.controller;

import cz.truchjan.unicorn.exception.ResourceNotFoundException;
import cz.truchjan.unicorn.model.History;
import cz.truchjan.unicorn.service.HistoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/link/{linkId}/history")
@AllArgsConstructor
@CrossOrigin(origins = {"http://127.0.0.1:5173/", "http://localhost:5173/"})
public class HistoryController {

	private final HistoryService historyService;

	@GetMapping(path = "")
	public List<History> getLinksHistory(@PathVariable Long linkId) throws ResourceNotFoundException {
		return historyService.getLinksHistory(linkId);
	}
}
